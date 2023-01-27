
<?php

	$inData = getRequestInfo();

	$var = $inData["column"];
	$cell = $inData[$var];
	$ID = $inData["ID"];
	// $userId = $inData["userId"];
	// $Name = $inData["Name"];
	// $Phone = $inData["Phone"];
	// $Email = $inData["Email"];
	// $Alive = $inData["Alive"];
	// $Relationship = $inData["Relationship"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// WHERE will either be pulled by HTML or provided by Query, fix once FrontEnd finishes design
		mysqli_query($conn,"UPDATE `Contacts` SET $var = $cell WHERE ID = '".$ID."'");
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
