
<?php
// This will work by modifiying the entire row
	$inData = getRequestInfo();

	$Images = $inData["Images"];
	$Name = $inData["Name"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$Alive = $inData["Alive"];
	$Relation = $inData["Relation"];
	$ID = $inData["ID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// WHERE will either be pulled by HTML or provided by Query, fix once FrontEnd finishes design
		$stmt = $conn->prepare("UPDATE Contacts SET Images = ?, Name = ?, Phone = ?, Email = ?,
					Alive = ?, Relation = ? WHERE ID = ?");
		$stmt->bind_param("sssssss", $Images, $Name, $Phone, $Email, $Alive, $Relation, $ID );
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		//$retValue = '{"error": "'.$column.'" }';
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
